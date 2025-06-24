/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "epam/ui5extension/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("epam.ui5extension.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                // Shell SDK library
                sap.ui.loader.config({
                    paths: {
                        "sap/coresystems/fsm-shell": "https://unpkg.com/fsm-shell@1.20.0/release/fsm-shell-client"
                    },
                    shim: {
                        "sap/coresystems/fsm-shell": {
                            amd: true,
                            exports: "FSMShell"
                        }
                    },
                    async: true
                });
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);