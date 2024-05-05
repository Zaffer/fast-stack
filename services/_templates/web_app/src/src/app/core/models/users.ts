import { Timestamp } from "@angular/fire/firestore";
import { Threads } from "./threads";

/**
 * User profile document model.
 */
export interface Users {
    threads: Threads[] | undefined;
    createTime: Timestamp;


    displayName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    photoURL: string | undefined;
    providerId: string | undefined;
    uid: string | undefined;
    registrationTokens: string[] | undefined;
};