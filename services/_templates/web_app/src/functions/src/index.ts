import { setGlobalOptions } from "firebase-functions/v2";
setGlobalOptions({ region: "europe-west2" });

export { helloWorld } from './helloWorld';
export { triggerAuthUserCreate } from './trigger-auth';
export { onSummaryCreated, onThemeFollowed, onNotificationsToggled } from './trigger-firestore';

