"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var db = require('../database/db');
module.exports = {
    // event_id,service_id,trainer_id,client_id,event_timestamp,notes
    getUpcomingEventsByTrainerId: function (trainer_id) {
        var currentTimestamp = getCurrentTimestamp();
        return db.query("SELECT * FROM events WHERE trainer_id='".concat(trainer_id, "' AND event_timestamp > '").concat(currentTimestamp, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    getUpcomingEventsByClientId: function (client_id) {
        var currentTimestamp = getCurrentTimestamp();
        return db.query("SELECT * FROM events WHERE client_id='".concat(client_id, "' AND event_timestamp > '").concat(currentTimestamp, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    createEvent: function (event_id, service_id, trainer_id, client_id, event_timestamp, notes) {
        return db.query("INSERT INTO events (event_id,service_id,trainer_id,client_id,event_timestamp,notes) VALUES ($1, $2, $3, $4, $5, $6)", [event_id, service_id, trainer_id, client_id, event_timestamp, notes])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    //idk if we should track reschedules
    rescheduleEvent: function (event_id, event_timestamp) {
        var currentTimestamp = getCurrentTimestamp();
        return db.query("UPDATE events SET event_timestamp = '".concat(event_timestamp, "' WHERE event_id = '").concat(event_id, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    rescheduleEvent: function (event_id, new_event_timestamp) { return __awaiter(void 0, void 0, void 0, function () {
        var getCurrentTimestamp, addHoursToTimestamp, currentTimestamp, minimumAllowedTimestamp, existingEvent, currentEventTimestamp, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    getCurrentTimestamp = function () {
                        var now = new Date();
                        return now.toISOString(); // Adjust the format as needed
                    };
                    addHoursToTimestamp = function (timestamp, hours) {
                        var originalDate = new Date(timestamp);
                        var newDate = new Date(originalDate.getTime() + hours * 60 * 60 * 1000);
                        return newDate.toISOString(); // Adjust the format as needed
                    };
                    currentTimestamp = getCurrentTimestamp();
                    minimumAllowedTimestamp = addHoursToTimestamp(currentTimestamp, 24);
                    if (new_event_timestamp < minimumAllowedTimestamp) {
                        throw new Error('New event_timestamp must be at least 24 hours in the future.');
                    }
                    return [4 /*yield*/, db.query("SELECT event_timestamp FROM events WHERE event_id = '".concat(event_id, "'"))];
                case 1:
                    existingEvent = _a.sent();
                    currentEventTimestamp = existingEvent[0].event_timestamp;
                    if (currentEventTimestamp < minimumAllowedTimestamp) {
                        throw new Error('Event timestamp is less than 24 hours from now. Cannot reschedule.');
                    }
                    return [4 /*yield*/, db.query("\n            UPDATE events\n            SET event_timestamp = '".concat(new_event_timestamp, "'\n            WHERE event_id = '").concat(event_id, "'\n        "))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
