sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("search.controller.view1", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onLiveChange: function (oEvent) {
                var getValue = oEvent.getParameter("newValue");
                var filter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, getValue);
                var aFilter = [filter];
                var oList = this.byId("idList1");
                oList.getBinding("items").filter(aFilter);

            },
            onSort: function () {
                if (this.getView().byId("idList1").getBinding("items").aSorters.length === 0) {
                    var oSort = new sap.ui.model.Sorter("productId", true);
                } else if (this.getView().byId("idList1").getBinding("items").aSorters[0].bDescending === true) {
                    var oSort = new sap.ui.model.Sorter("productId", false);
                } else {
                    var oSort = new sap.ui.model.Sorter("productId", true);
                }
                this.getView().byId("idList1").getBinding("items").sort(oSort);
            },
            onFilter: function () {
                this.oFragment = new sap.ui.xmlfragment("search.fragments.dialog", this);
                this.getView().addContent(this.oFragment);
                return this.oFragment.open();
            },
            onClose: function () {
                this.oFragment.close();
            },
            onSelection: function (oEvent) {
                var aFilter = [];
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var selectedIndex = parseInt(sPath.split("/")[2]);
                var filterValues = this.getView().getModel().getProperty("/filter");
                var value = filterValues[selectedIndex].price;
                if (value === ">15") {
                    aFilter = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.GT, 15);
                } else if (value === "<15") {
                    aFilter = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.LT, 15);
                } else {
                    aFilter = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.EQ, 15);
                }
                var list = this.getView().byId("idList1");
                list.getBinding("items").filter(aFilter);
                this.oFragment.close();
            },
            onRefresh: function (oEvent) {
                var refresh = oEvent.getParameter("refreshButtonPressed");
                var list = this.getView().byId("idList1");
                list.getBinding("items").filter(null);
            },
            onBack: function () {
                this.oRouter.navTo("default");
            }
        })
    }
)