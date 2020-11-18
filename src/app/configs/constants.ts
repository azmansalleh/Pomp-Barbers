export abstract class Constants {
    static readonly APP_NAME: string = 'Pomp Barbers Online Booking';

    // Enpdoints
    static readonly TIMESLOTS_ENDPOINT = '/timeslots';
    static readonly UNAVAILABLE_TIMESLOTS_ENDPOINT = '/unavailable-timeslots';
    static readonly APPOINTMENTS_ENDPOINT = '/appointments';

    // AWS
    static readonly REGION = 'ap-southeast-1';
    static readonly USER_POOL_ID = 'ap-southeast-1_mqhWnNP7s';
    static readonly USER_POOL_WEB_CLIENT_ID = '43t223d0hh4orbts1moptl4sfi';
    static readonly AUTHENTICATION_FLOW_TYPE = 'USER_PASSWORD_AUTH';

}
