(function () {
    angular.module('app.yamcs')

    /*
        Returns true if the value string is part of the same XTCE space/sub system
        base on qualified names.
     */
    .filter('sameSpaceSystem', function () {
        return function (value, otherValue) {
            if (!value || !otherValue) return false;
            var a = value.slice(0, value.lastIndexOf('/'));
            var b = otherValue.slice(0, otherValue.lastIndexOf('/'));
            return a === b;
        };
    })

    /*
        Returns the space system for the fully qualified XTCE name
     */
    .filter('spaceSystem', function () {
        return function (value) {
            if (!value) return '';
            return value.slice(0, value.lastIndexOf('/'));
        };
    })

    /*
        Returns the short name for the given fully qualified XTCE name
     */
    .filter('name', function () {
        return function (value) {
            if (!value) return '';
            return value.slice(value.lastIndexOf('/')+ 1);
        };
    })

    /*
        Outputs the string value of a pval
     */
    .filter('stringValue', function () {
        return function (param, usingRaw) {
            if (!param) return '';
            if(usingRaw) {
                var rv=param.rawValue;
                for(var idx in rv) {
                    if(idx!='type') return rv[idx];
                }
            } else {
                var ev=param.engValue;
                if(ev === undefined) {
                    console.log('got parameter without engValue: ', param);
                    return null;
                }
                switch(ev.type) {
                    case 'FLOAT':
                        return ev.floatValue;
                    case 'DOUBLE':
                        return ev.doubleValue;
                    case 'BINARY':
                        return window.atob(ev.binaryValue);
                }
                for(var idx in ev) {
                    if(idx!='type') return ev[idx];
                }
            }
        };
    })

    /*
        Converts monitoringResult to a twitter bootstrap class
     */
    .filter('monitoringClass', function () {
        return function (monitoringResult) {
            if (!monitoringResult) return '';
            switch (monitoringResult) {
                case 'WATCH':
                case 'WATCH_LOW':
                case 'WATCH_HIGH':
                case 'WARNING':
                case 'WARNING_LOW':
                case 'WARNING_HIGH':
                case 'DISTRESS':
                case 'DISTRESS_LOW':
                case 'DISTRESS_HIGH':
                case 'CRITICAL':
                case 'CRITICAL_LOW':
                case 'CRITICAL_HIGH':
                case 'SEVERE':
                case 'SEVERE_LOW':
                case 'SEVERE_HIGH':
                    return 'danger';
                case 'IN_LIMITS':
                    return 'success';
                default:
                    return 'default';
            }
        };
    })

    /*
        Converts monitoringResult to a twitter bootstrap class
     */
    .filter('monitoringValue', function () {
        return function (monitoringResult) {
            if (!monitoringResult) return '';
            switch (monitoringResult) {
                case 'WATCH': return 'Watch';
                case 'WATCH_LOW': return 'Watch Low';
                case 'WATCH_HIGH': return 'Watch High';
                case 'WARNING': return 'Warning';
                case 'WARNING_LOW': return 'Warning Low';
                case 'WARNING_HIGH': return 'Warning High';
                case 'DISTRESS': return 'Distress';
                case 'DISTRESS_LOW': return 'Distress Low';
                case 'DISTRESS_HIGH': return 'Distress High';
                case 'CRITICAL': return 'Critical';
                case 'CRITICAL_LOW': return 'Critical Low';
                case 'CRITICAL_HIGH': return 'Critical High';
                case 'SEVERE': return 'Severe';
                case 'SEVERE_LOW': return 'Severe Low';
                case 'SEVERE_HIGH': return 'Severe High';
                case 'IN_LIMITS': return 'In Limits';
                default: console.log('should handle value ' + monitoringResult); return '';
            }
        };
    })

    /*
        Converts monitoringResult to a numeric 0-5 severity level
     */
    .filter('monitoringLevel', function () {
        return function (monitoringResult) {
            if (!monitoringResult) return 0;
            switch (monitoringResult) {
                case 'WATCH':
                case 'WATCH_LOW':
                case 'WATCH_HIGH':
                    return 1;
                case 'WARNING':
                case 'WARNING_LOW':
                case 'WARNING_HIGH':
                    return 2;
                case 'DISTRESS':
                case 'DISTRESS_LOW':
                case 'DISTRESS_HIGH':
                    return 3;
                case 'CRITICAL':
                case 'CRITICAL_LOW':
                case 'CRITICAL_HIGH':
                    return 4;
                case 'SEVERE':
                case 'SEVERE_LOW':
                case 'SEVERE_HIGH':
                    return 5;
                default:
                    return 0;
            }
        };
    })

    /*
        Converts the MDB operator type
     */
    .filter('asOperator', function () {
        return function (value) {
            if (!value) return '';
            switch (value) {
                case 'EQUAL_TO':
                    return '==';
                case 'NOT_EQUAL_TO':
                    return '!=';
                case 'GREATER_THAN':
                    return '>';
                case 'GREATER_THAN_OR_EQUAL_TO':
                    return '>=';
                case 'SMALLER_THAN':
                    return '<';
                case 'SMALLER_THAN_OR_EQUAL_TO':
                    return '<=';
                default:
                    return '??';
            }
        };
    });
})();