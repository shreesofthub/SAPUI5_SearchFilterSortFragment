sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("search.controller.login", {
            onInit: function () {
                that = this;
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onLogin: function () {
                var oSF = that.getView().byId("idSF");
                var Id = oSF.getContent()[0].getValue();
                var pwd = oSF.getContent()[1].getValue();
                if (Id !== "Sridhar") {
                    new sap.m.MessageToast.show("Invalid User Id");
                } else if (pwd === "mickle") {
                    this.oRouter.navTo("view1");
                }
            }
        });
    }
);