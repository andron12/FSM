sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/coresystems/fsm-shell"
],
function (Controller) {
    "use strict";

    return Controller.extend("epam.ui5extension.controller.View1", {
        onInit: function () {
            const oView = this.getView();
            const { ShellSdk, SHELL_EVENTS } = FSMShell;

            const shellSdk = ShellSdk.init(parent, '*');

            shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
                clientIdentifier: 'fsm-demo-plugin',
                 auth: {
                    response_type: 'token'  // request a user token within the context
                }
            });
           // Callback on fsm context response
      shellSdk.on(SHELL_EVENTS.Version1.SET_CONTEXT, (event) => {
        const { cloudHost, account, company, user } = event;

        console.log("✅ Контекст отримано:");
        console.log("🌐 Cloud Host:", cloudHost);
        console.log("🏢 Company:", company);
        console.log("👤 User:", user);

        // за потреби зберегти в контролері або ViewModel
        this._fsmContext = { cloudHost, account, company, user };
      });
      // 👉 Отримання токена
      shellSdk.on(SHELL_EVENTS.Version1.SET_AUTHENTICATION, (event) => {
        const { token } = event;

        console.log("🔐 Отримано токен доступу:", token);

        // збережи токен для виклику FSM API
        this._authToken = token;

        // приклад використання токена
        this.callFSMEquipmentAPI(token);
      });

 
       
        },
        callFSMEquipmentAPI: function (token) {
      fetch("https://your-fsm-url/api/v1/equipment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Отримано Equipment:", data);
      })
      .catch((err) => console.error("❌ Помилка при запиті до FSM:", err));
    }
    });
});
