// change to use 'service' instead.
/**
 * <alert ng-repeat="alert in alerts" type="alert.type" close="alert.close()">
 *   <span data-ng-bind-html="alert.msg"></span>
 * </alert>
 */
app.factory('alertService', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        var alertService = {};

        $rootScope.alerts = [];

        alertService.add = function(type, msg) {
            var alert = {
                'type' : type,
                'msg'  : msg,
                'close': function(){ alertService.closeAlert(this); }
            };

            $rootScope.alerts.push(alert);

            // auto close itself after three seconds display.
            $timeout(function(){
                alertService.closeAlert(alert);
            }, 3000);
        };

        alertService.addWarning = function(msg) {
            this.add('warning', msg);
        };

        alertService.addSuccess = function(msg) {
            this.add('success', msg);
        };

        alertService.addDanger = function(msg) {
            this.add('danger', msg);
        };

        alertService.addInfo = function(msg) {
            this.add('info', msg);
        };

        alertService.closeAlert = function(alert) {
            alertService.closeAlertIdx($rootScope.alerts.indexOf(alert));
        };

        alertService.closeAlertIdx = function(index) {
            $rootScope.alerts.splice(index, 1);
        };

        return alertService;
    }]);