import React from "react";
const Loginrfid = React.lazy(() => import("./views/pages/loginrfid/Loginrfid"));
const Home = React.lazy(() => import("./views/Home"));
const ReceiveTool = React.lazy(() => import("./views/ReceiveTool"));
const TakeoutTool = React.lazy(() => import("./views/TakeoutTool"));
const SettingMachine = React.lazy(() => import("./views/SettingMachine"));
const SettingAnother = React.lazy(() => import("./views/SettingAnother"));
const Inventory = React.lazy(() => import("./views/SettingAnother/Inventory"));

const Machine = React.lazy(() =>
  import("./views/SettingAnother/Machine/Machine")
);
const MachineModel = React.lazy(() =>
  import("./views/SettingAnother/Machine/MachineModel")
);
const MachineBrand = React.lazy(() =>
  import("./views/SettingAnother/Machine/MachineBrand")
);
const MachieneType = React.lazy(() =>
  import("./views/SettingAnother/Machine/MachineType")
);
const Product = React.lazy(() =>
  import("./views/SettingAnother/Product/Product")
);
const ProductType = React.lazy(() =>
  import("./views/SettingAnother/Product/ProductType")
);
const ProductGroup = React.lazy(() =>
  import("./views/SettingAnother/Product/ProductGroup")
);
const ProductBrand = React.lazy(() =>
  import("./views/SettingAnother/Product/ProductBrand")
);
const Stock = React.lazy(() => import("./views/SettingAnother/Stock/Stock"));
const StockLayout = React.lazy(() =>
  import("./views/SettingAnother/Stock/StockLayout")
);
const User = React.lazy(() => import("./views/SettingAnother/User/User"));
const Premission = React.lazy(() =>
  import("./views/SettingAnother/User/Premission")
);
const Department = React.lazy(() =>
  import("./views/SettingAnother/User/Department")
);
const UserType = React.lazy(() =>
  import("./views/SettingAnother/User/UserType")
);

const UserbyGroup = React.lazy(() =>
  import("./views/SettingAnother/User/UserbyGroup")
);
const Report = React.lazy(() => import("./views/Report"));
const Layoutposition = React.lazy(() => import("./views/Layoutposition"));

const Abnormal = React.lazy(() => import("./views/SettingAnother/Abnormal"));
const routes = [
  {
    path: "/",
    exact: true,
    name: "Vending-Home",
    permission_name: "Vending-Home",
    component: Home,
  },
  {
    path: "/settinganother/abnormal",
    exact: true,
    name: "Vending-Abnormal",
    permission_name: "Vending-Abnormal",
    component: Abnormal,
  },

  {
    path: "/Loginrfid",
    name: "Loginrfid",
    permission_name: "",
    component: Loginrfid,
  },

  {
    path: "/receivetool",
    name: "Vending-Receive-Tool",
    permission_name: "Vending-Receive-Tool",

    component: ReceiveTool,
  },
  {
    path: "/inventory",
    name: "Vending-inventory",
    permission_name: "Vending-inventory",
    component: Inventory,
  },
  {
    path: "/takeouttool",
    name: "Vending-Takeout-Tool",
    permission_name: "Vending-Takeout-Tool",
    component: TakeoutTool,
  },
  {
    path: "/settingmachine",
    name: "Vending-Setting-Machine",
    permission_name: "Vending-Setting-Machine",
    component: SettingMachine,
  },

  {
    path: "/settinganother/machine/machinetype",
    name: "Vending-Machiene-Type",
    permission_name: "Vending-Machiene-Type",
    component: MachieneType,
  },
  {
    path: "/settinganother/machine/machine",
    name: "Vending-Machine",
    permission_name: "Vending-Machine",
    component: Machine,
  },
  {
    path: "/settinganother/machine/machinemodel",
    name: "Vending-Machine-Model",
    permission_name: "Vending-Machine-Model",
    component: MachineModel,
  },
  {
    path: "/settinganother/machine/machinebrand",
    name: "Vending-Machine-Brand",
    permission_name: "Vending-Machine-Brand",
    component: MachineBrand,
  },

  {
    path: "/settinganother/product/product",
    name: "Vending-Product",
    permission_name: "Vending-Product",
    component: Product,
  },
  {
    path: "/settinganother/product/product-type",
    name: "Vending-Product-Type",
    permission_name: "Vending-Product-Type",
    component: ProductType,
  },
  {
    path: "/settinganother/product/product-group",
    name: "Vending-Product-Group",
    permission_name: "Vending-Product-Group",
    component: ProductGroup,
  },
  {
    path: "/settinganother/product/product-brand",
    name: "Vending-Product-Brand",
    permission_name: "Vending-Product-Brand",
    component: ProductBrand,
  },

  {
    path: "/settinganother/stock/stock",
    name: "Vending-Stock",
    permission_name: "Vending-Stock",
    component: Stock,
  },
  {
    path: "/settinganother/stock/stock-layout",
    name: "Vending-Stock-Layout",
    permission_name: "Vending-Stock-Layout",
    component: StockLayout,
  },

  {
    path: "/settinganother/user/user",
    name: "Vending-User",
    permission_name: "Vending-User",
    component: User,
  },
  {
    path: "/settinganother/user/premission",
    name: "Vending-License",
    permission_name: "Vending-License",
    component: Premission,
  },
  {
    path: "/settinganother/user/department",
    name: "Vending-Department",
    permission_name: "Vending-Department",
    component: Department,
  },
  {
    path: "/settinganother/user/user-type",
    name: "Vending-User-Type",
    permission_name: "Vending-User-Type",
    component: UserType,
  },

  {
    path: "/settinganother/user/userby-group",
    name: "Vending-User-Group",
    permission_name: "Vending-Userby-Group",
    component: UserbyGroup,
  },

  {
    path: "/settinganother",
    name: "Vending-Setting-Another",
    permission_name: "Vending-Setting-Another",
    component: SettingAnother,
  },
  {
    path: "/report",
    name: "Vending-Report",
    permission_name: "Vending-Report",
    component: Report,
  },
  {
    path: "/layoutposition",
    name: "Vending-Layoutposition",
    permission_name: "Vending-Layoutposition",
    component: Layoutposition,
  },
];
export default routes;
