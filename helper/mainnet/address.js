'use strict'
const Address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  MIM: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
  MUSD: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
  FEI: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  FRAX: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  ALUSD: '0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9',
  SWAP_MANAGER: '0xe382d9f2394A359B01006faa8A1864b8a60d2710',
  COLLATERAL_MANAGER: '0xaBC64889601F01e7B26277Ef8756250d6ABf8c18',
  FEE_COLLECTOR: '0x80d426D65D926dF121dc58C18D043B73e998CE2b',
  ADDRESS_LIST_FACTORY: '0xded8217De022706A191eE7Ee0Dc9df1185Fb5dA3',
  KEEPER: '0x76d266dfd3754f090488ae12f6bd115cd7e77ebd',
  ANY_ERC20: '0xa3d58c4e56fedcae3a7c43a725aee9a71f0ece4e', // MET
  SUSHI_ROUTER: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  UNI2_ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  NATIVE_TOKEN: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  MULTICALL: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  VSP: '0x1b40183efb4dd766f11bda7a7c3ad8982e998421',
  vDAI: '0xB4eDcEFd59750144882170FCc52ffeD40BfD5f7d',
  vaDPI: '0x9b91ab47cefC35dbe4DDCC7983fFA1fB40795663',
  vaDAI: '0x0538C8bAc84E95A9dF8aC10Aad17DbE81b9E36ee',
  vLINK: '0x0a27E910Aee974D05000e05eab8a4b8Ebd93D40C',
  vaLINK: '0xef4F4604106de23CDadfEAE08fcC34602cB475C1',
  vWBTC: '0x4B2e76EbBc9f2923d83F5FBDe695D8733db1a17B',
  vaWBTC: '0x01e1d41C1159b745298724c5Fd3eAfF3da1C6efD',
  vaETH: '0xd1C117319B3595fbc39b471AB1fd485629eb05F2',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  DPI: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
  vVSP: '0xbA4cFE5741b357FA371b506e5db0774aBFeCf8Fc',
  GOVERNOR: '0x9520b477Aa81180E6DdC006Fc09Fb6d3eb4e807A',
  DEPLOYER: '0xB5AbDABE50b5193d4dB92a16011792B22bA3Ef51',
  CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  PUNK: '0x269616d549d7e8eaa82dfb17028d0b212d11232a',
  Aave: {
    AddressProvider: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    aDAI: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
    aDPI: '0x6F634c6135D2EBD550000ac92F494F9CB8183dAe',
    aFEI: '0x683923dB55Fead99A79Fa01A27EeC3cB19679cC3',
    aLINK: '0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0',
    aUNI: '0xB9D7CB55f463405CDfBe4E90a6D2Df01C2B92BF1',
    aUSDC: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
    aUSDCv1: '0x9bA00D6856a4eDF4665BcA2C2309936572473B7E',
    aUSDT: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
    aWETH: '0x030bA81f1c18d280636F32af80b9AAd02Cf0854e',
  },
  Alpha: {
    ibDAIv2: '0xee8389d235E092b2945fE363e97CDBeD121A0439',
    ibDPIv2: '0xd80ce6816f263c3ca551558b2034b61bc9852b97',
    ibETHv2: '0xeea3311250fe4c3268f8e684f7c87a82ff183ec1',
    ibLINKv2: '0xb59Ecdf6C2AEA5E67FaFbAf912B26658d43295Ed',
    ibUSDCv2: '0x08bd64BFC832F1C2B3e07e634934453bA7Fa2db2',
    ibUSDTv2: '0x020eDC614187F9937A1EfEeE007656C6356Fb13A',
  },
  Compound: {
    COMPTROLLER: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
    COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    cDAI: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    cETH: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
    cLINK: '0xFAce851a4921ce59e912d19329929CE6da6EB0c7',
    cUNI: '0x35A18000230DA775CAc24873d00Ff85BccdeD550',
    cUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    cUSDT: '0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9',
    cWBTC: '0xccF4429DB6322D5C611ee964527D42E5d685DD6a',
  },
  Inverse: {
    COMPTROLLER: '0x4dCf7407AE5C07f8681e1659f626E114A7667339',
    INV: '0x41D5D79431A913C4aE7d69a668ecdfE5fF9DFB68',
    anETH: '0x697b4acAa24430F254224eB794d2a85ba1Fa1FB8',
  },
  Drops: {
    COMPTROLLER: '0x79b56CB219901DBF42bB5951a0eDF27465F96206',
    DOP: '0x6bB61215298F296C55b19Ad842D3Df69021DA2ef',
    dETH: '0x4aE7413182849D062B72518928a4b2DE87F0e411',
  },
  Maker: {
    MCD_JOIN_ETH_A: '0x2F0b23f53734252Bda2277357e97e1517d6B042A',
    MCD_JOIN_ETH_C: '0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E',
    MCD_JOIN_WBTC_A: '0xBF72Da2Bd84c5170618Fbe5914B0ECA9638d5eb5',
    MCD_JOIN_LINK_A: '0xdFccAf8fDbD2F4805C174f856a317765B49E4a50',
    MCD_JOIN_UNI_A: '0x3BC3A58b4FC1CbE7e98bB4aB7c99535e8bA9b8F1',
  },
  Yearn: {
    yvDAI: '0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
    yvUSDC: '0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9',
    yvWETH: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
  },
  MultiSig: {
    safe: '0x9520b477Aa81180E6DdC006Fc09Fb6d3eb4e807A',
  },
  Rari: {
    fusePoolDirectory: '0x835482FE0532f169024d5E9410199369aAD5C77E',
  },
}

module.exports = Object.freeze(Address)
