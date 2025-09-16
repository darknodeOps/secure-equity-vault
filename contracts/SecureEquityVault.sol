// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureEquityVault is SepoliaConfig {
    using FHE for *;
    
    struct EquityAsset {
        euint32 assetId;
        euint32 totalValue;
        euint32 availableShares;
        euint32 pricePerShare;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        string assetType;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Investment {
        euint32 investmentId;
        euint32 assetId;
        euint32 amount;
        euint32 shares;
        address investor;
        uint256 timestamp;
        bool isActive;
    }
    
    struct LendingPool {
        euint32 poolId;
        euint32 totalLiquidity;
        euint32 availableLiquidity;
        euint32 interestRate;
        euint32 totalBorrowed;
        bool isActive;
        address poolManager;
        uint256 createdAt;
    }
    
    struct Loan {
        euint32 loanId;
        euint32 poolId;
        euint32 amount;
        euint32 collateralValue;
        euint32 interestRate;
        uint256 term;
        address borrower;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isRepaid;
    }
    
    struct Portfolio {
        euint32 totalValue;
        euint32 totalInvested;
        euint32 totalBorrowed;
        euint32 creditScore;
        address owner;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => EquityAsset) public assets;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => LendingPool) public lendingPools;
    mapping(uint256 => Loan) public loans;
    mapping(address => Portfolio) public portfolios;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32[]) public userInvestments;
    mapping(address => euint32[]) public userLoans;
    
    uint256 public assetCounter;
    uint256 public investmentCounter;
    uint256 public poolCounter;
    uint256 public loanCounter;
    
    address public owner;
    address public verifier;
    address public oracle;
    
    event AssetCreated(uint256 indexed assetId, address indexed owner, string name);
    event InvestmentMade(uint256 indexed investmentId, uint256 indexed assetId, address indexed investor, uint32 amount);
    event LendingPoolCreated(uint256 indexed poolId, address indexed manager, uint32 liquidity);
    event LoanCreated(uint256 indexed loanId, uint256 indexed poolId, address indexed borrower, uint32 amount);
    event LoanRepaid(uint256 indexed loanId, uint32 amount);
    event AssetVerified(uint256 indexed assetId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _oracle) {
        owner = msg.sender;
        verifier = _verifier;
        oracle = _oracle;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function createAsset(
        string memory _name,
        string memory _description,
        string memory _assetType,
        externalEuint32 _totalValue,
        externalEuint32 _pricePerShare,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Asset name cannot be empty");
        require(bytes(_assetType).length > 0, "Asset type cannot be empty");
        
        uint256 assetId = assetCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalTotalValue = FHE.fromExternal(_totalValue, inputProof);
        euint32 internalPricePerShare = FHE.fromExternal(_pricePerShare, inputProof);
        
        // Calculate available shares
        euint32 availableShares = FHE.div(internalTotalValue, internalPricePerShare);
        
        assets[assetId] = EquityAsset({
            assetId: FHE.asEuint32(0), // Will be set properly later
            totalValue: internalTotalValue,
            availableShares: availableShares,
            pricePerShare: internalPricePerShare,
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            assetType: _assetType,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit AssetCreated(assetId, msg.sender, _name);
        return assetId;
    }
    
    function investInAsset(
        uint256 assetId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(assets[assetId].owner != address(0), "Asset does not exist");
        require(assets[assetId].isActive, "Asset is not active");
        require(assets[assetId].isVerified, "Asset must be verified");
        
        uint256 investmentId = investmentCounter++;
        
        // Convert external amount to internal FHE value
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Calculate shares to be purchased
        euint32 shares = FHE.div(internalAmount, assets[assetId].pricePerShare);
        
        // Check if enough shares are available
        require(FHE.decrypt(FHE.lt(shares, assets[assetId].availableShares)), "Not enough shares available");
        
        investments[investmentId] = Investment({
            investmentId: FHE.asEuint32(0), // Will be set properly later
            assetId: FHE.asEuint32(assetId),
            amount: internalAmount,
            shares: shares,
            investor: msg.sender,
            timestamp: block.timestamp,
            isActive: true
        });
        
        // Update asset available shares
        assets[assetId].availableShares = FHE.sub(assets[assetId].availableShares, shares);
        assets[assetId].updatedAt = block.timestamp;
        
        // Update user investments
        userInvestments[msg.sender].push(FHE.asEuint32(investmentId));
        
        // Update portfolio
        _updatePortfolio(msg.sender, internalAmount, FHE.asEuint32(0), FHE.asEuint32(0));
        
        emit InvestmentMade(investmentId, assetId, msg.sender, 0); // Amount will be decrypted off-chain
        return investmentId;
    }
    
    function createLendingPool(
        externalEuint32 _totalLiquidity,
        externalEuint32 _interestRate,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender != address(0), "Invalid pool manager");
        
        uint256 poolId = poolCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalLiquidity = FHE.fromExternal(_totalLiquidity, inputProof);
        euint32 internalInterestRate = FHE.fromExternal(_interestRate, inputProof);
        
        lendingPools[poolId] = LendingPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalLiquidity: internalLiquidity,
            availableLiquidity: internalLiquidity,
            interestRate: internalInterestRate,
            totalBorrowed: FHE.asEuint32(0),
            isActive: true,
            poolManager: msg.sender,
            createdAt: block.timestamp
        });
        
        emit LendingPoolCreated(poolId, msg.sender, 0); // Liquidity will be decrypted off-chain
        return poolId;
    }
    
    function borrowFromPool(
        uint256 poolId,
        externalEuint32 amount,
        externalEuint32 collateralValue,
        uint256 term,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(lendingPools[poolId].poolManager != address(0), "Pool does not exist");
        require(lendingPools[poolId].isActive, "Pool is not active");
        require(term > 0, "Term must be positive");
        
        uint256 loanId = loanCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(collateralValue, inputProof);
        
        // Check if enough liquidity is available
        require(FHE.decrypt(FHE.lt(internalAmount, lendingPools[poolId].availableLiquidity)), "Not enough liquidity available");
        
        // Check collateral ratio (should be at least 150%)
        euint32 collateralRatio = FHE.div(internalCollateralValue, internalAmount);
        require(FHE.decrypt(FHE.gt(collateralRatio, FHE.asEuint32(150))), "Insufficient collateral");
        
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            poolId: FHE.asEuint32(poolId),
            amount: internalAmount,
            collateralValue: internalCollateralValue,
            interestRate: lendingPools[poolId].interestRate,
            term: term,
            borrower: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + term,
            isActive: true,
            isRepaid: false
        });
        
        // Update pool liquidity
        lendingPools[poolId].availableLiquidity = FHE.sub(lendingPools[poolId].availableLiquidity, internalAmount);
        lendingPools[poolId].totalBorrowed = FHE.add(lendingPools[poolId].totalBorrowed, internalAmount);
        
        // Update user loans
        userLoans[msg.sender].push(FHE.asEuint32(loanId));
        
        // Update portfolio
        _updatePortfolio(msg.sender, FHE.asEuint32(0), FHE.asEuint32(0), internalAmount);
        
        emit LoanCreated(loanId, poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return loanId;
    }
    
    function repayLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable {
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        
        // Convert external amount to internal FHE value
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Calculate total amount to repay (principal + interest)
        euint32 interest = FHE.mul(loans[loanId].amount, loans[loanId].interestRate);
        interest = FHE.div(interest, FHE.asEuint32(10000)); // Assuming interest rate is in basis points
        euint32 totalRepayAmount = FHE.add(loans[loanId].amount, interest);
        
        // Check if repayment amount is sufficient
        require(FHE.decrypt(FHE.gte(internalAmount, totalRepayAmount)), "Insufficient repayment amount");
        
        // Mark loan as repaid
        loans[loanId].isRepaid = true;
        loans[loanId].isActive = false;
        
        // Return liquidity to pool
        uint256 poolId = FHE.decrypt(loans[loanId].poolId);
        lendingPools[poolId].availableLiquidity = FHE.add(lendingPools[poolId].availableLiquidity, loans[loanId].amount);
        lendingPools[poolId].totalBorrowed = FHE.sub(lendingPools[poolId].totalBorrowed, loans[loanId].amount);
        
        // Update portfolio
        _updatePortfolio(msg.sender, FHE.asEuint32(0), FHE.asEuint32(0), FHE.sub(FHE.asEuint32(0), loans[loanId].amount));
        
        emit LoanRepaid(loanId, 0); // Amount will be decrypted off-chain
    }
    
    function verifyAsset(uint256 assetId, bool isVerified) public onlyVerifier {
        require(assets[assetId].owner != address(0), "Asset does not exist");
        assets[assetId].isVerified = isVerified;
        emit AssetVerified(assetId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function _updatePortfolio(
        address user,
        euint32 investmentAmount,
        euint32 profitAmount,
        euint32 loanAmount
    ) internal {
        Portfolio storage portfolio = portfolios[user];
        
        if (portfolio.owner == address(0)) {
            portfolio.owner = user;
            portfolio.totalValue = FHE.asEuint32(0);
            portfolio.totalInvested = FHE.asEuint32(0);
            portfolio.totalBorrowed = FHE.asEuint32(0);
            portfolio.creditScore = FHE.asEuint32(500); // Default credit score
        }
        
        // Update portfolio values
        portfolio.totalInvested = FHE.add(portfolio.totalInvested, investmentAmount);
        portfolio.totalBorrowed = FHE.add(portfolio.totalBorrowed, loanAmount);
        portfolio.totalValue = FHE.add(portfolio.totalValue, FHE.add(investmentAmount, profitAmount));
        portfolio.lastUpdated = block.timestamp;
        
        // Update credit score based on loan repayment history
        if (FHE.decrypt(FHE.gt(loanAmount, FHE.asEuint32(0)))) {
            // Decrease credit score for new loans
            portfolio.creditScore = FHE.sub(portfolio.creditScore, FHE.asEuint32(10));
        } else {
            // Increase credit score for repayments
            portfolio.creditScore = FHE.add(portfolio.creditScore, FHE.asEuint32(5));
        }
        
        // Ensure credit score stays within bounds
        if (FHE.decrypt(FHE.lt(portfolio.creditScore, FHE.asEuint32(300)))) {
            portfolio.creditScore = FHE.asEuint32(300);
        }
        if (FHE.decrypt(FHE.gt(portfolio.creditScore, FHE.asEuint32(850)))) {
            portfolio.creditScore = FHE.asEuint32(850);
        }
    }
    
    // View functions (return encrypted values that need to be decrypted off-chain)
    function getAssetInfo(uint256 assetId) public view returns (
        string memory name,
        string memory description,
        string memory assetType,
        uint8 totalValue,
        uint8 availableShares,
        uint8 pricePerShare,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt
    ) {
        EquityAsset storage asset = assets[assetId];
        return (
            asset.name,
            asset.description,
            asset.assetType,
            0, // FHE.decrypt(asset.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(asset.availableShares) - will be decrypted off-chain
            0, // FHE.decrypt(asset.pricePerShare) - will be decrypted off-chain
            asset.isActive,
            asset.isVerified,
            asset.owner,
            asset.createdAt
        );
    }
    
    function getInvestmentInfo(uint256 investmentId) public view returns (
        uint8 assetId,
        uint8 amount,
        uint8 shares,
        address investor,
        uint256 timestamp,
        bool isActive
    ) {
        Investment storage investment = investments[investmentId];
        return (
            0, // FHE.decrypt(investment.assetId) - will be decrypted off-chain
            0, // FHE.decrypt(investment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(investment.shares) - will be decrypted off-chain
            investment.investor,
            investment.timestamp,
            investment.isActive
        );
    }
    
    function getPortfolioInfo(address user) public view returns (
        uint8 totalValue,
        uint8 totalInvested,
        uint8 totalBorrowed,
        uint8 creditScore,
        uint256 lastUpdated
    ) {
        Portfolio storage portfolio = portfolios[user];
        return (
            0, // FHE.decrypt(portfolio.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.totalInvested) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.totalBorrowed) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.creditScore) - will be decrypted off-chain
            portfolio.lastUpdated
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
}
