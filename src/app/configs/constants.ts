export abstract class Constants {
    static readonly APP_NAME: string = 'CRM Internet Portal';
    static readonly ACTIVE_CASES_TITLE: string = 'Active Cases';
    static readonly EDIT_CASE_TITLE: string = 'Edit Case';

    // Escalate Case
    static readonly ESCALATE_SUCCESS: string = 'Case successfully escalated to NSCC';
    static readonly ESCALATE_ERROR: string = 'Case escalation failed. Please try again';

    // Resolve Case
    static readonly RESOLVE_SUCCESS: string = 'Case successfully resolved';
    static readonly RESOLVE_ERROR: string = 'Case resolution failed. Please try again';

    // Update Case
    static readonly UPDATE_SUCCESS: string = 'Case successfully updated';
    static readonly UPDATE_ERROR: string = 'Case update failed. Please try again';

    // Snackbar
    static readonly SNACKBAR_SUCCESS: string = 'success-snackbar';
    static readonly SNACKBAR_ERROR: string = 'error-snackbar';
    static readonly SNACKBAR_CLOSE: string = 'Close';

    static readonly TIMESLOTS_ENDPOINT = '/timeslots';

}
