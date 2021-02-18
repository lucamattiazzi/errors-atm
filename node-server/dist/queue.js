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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessQueue = void 0;
class ProcessQueue {
    constructor(processorFn) {
        this.next = undefined;
        this.first = undefined;
        this.last = undefined;
        this.insert = (message) => {
            const queueMessage = Object.assign(Object.assign({}, message), { next: undefined });
            if (this.last) {
                this.last.next = queueMessage;
                this.last = queueMessage;
            }
            else {
                this.first = queueMessage;
                this.last = queueMessage;
                this.start();
            }
        };
        this.printQueue = (msg) => {
            if (msg.next)
                this.printQueue(msg.next);
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            while (this.first) {
                yield this.processorFn(this.first);
                this.first = this.first.next;
            }
            this.last = undefined;
        });
        this.processorFn = processorFn;
    }
}
exports.ProcessQueue = ProcessQueue;
//# sourceMappingURL=queue.js.map