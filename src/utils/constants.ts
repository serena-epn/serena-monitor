import { TMenuItem } from "../types/CustomTypes";
import { THeaderComponentProps } from "../types/CustomTypes";

export const APPNAME = "Serena";

export const DEVICESCREENMENU:TMenuItem[] = 
[
    {
        itemId:1,
        itemTitle: "DEVICE_STATUS_TITLE",
        itemDescription: "DEVICE_STATUS_DESCRIPTION",
        itemIcon:"troubleshoot",
        itemOnClick:"DeviceStatusScreen"
    },
    {
        itemId:2,
        itemTitle: "DEVICE_ZONES_TITLE",
        itemDescription: "DEVICE_ZONES_DESCRIPTION",
        itemIcon:"edit-location",
        itemOnClick:"DeviceZonesScreen"
    },
    {
        itemId:3,
        itemTitle: "DEVICE_MAPS_TITLE",
        itemDescription: "DEVICE_MAPS_DESCRIPTION",
        itemIcon:"map",
        itemOnClick:"DeviceMapsScreen"
    },
    {
        itemId:4,
        itemTitle: "DEVICE_CONFIG_TITLE",
        itemDescription: "DEVICE_CONFIG_DESCRIPTION",
        itemIcon:"app-settings-alt",
        itemOnClick:"DeviceConfigScreen"
    },
]

export const CONFIGSCREENMENU:TMenuItem[] = 
[
    {
        itemId:1,
        itemTitle: "CONFIG_CAREGIVER_TITLE",
        itemDescription: "CONFIG_CAREGIVER_DESCRIPTION",
        itemIcon:"manage-accounts",
        itemOnClick:"ConfigCaregiverScreen"
    },
    {
        itemId:2,
        itemTitle: "CONFIG_PATIENT_TITLE",
        itemDescription: "CONFIG_PATIENT_DESCRIPTION",
        itemIcon:"supervisor-account",
        itemOnClick:"ConfigPatientScreen"
    },
    {
        itemId:3,
        itemTitle: "CONFIG_LOGOUT_TITLE",
        itemDescription: "CONFIG_LOGOUT_DESCRIPTION",
        itemIcon:"logout",
        itemOnClick:"AuthScreen",
        itemMethodType:"logout"
    },
]

export const HELPSCREENMENU:TMenuItem[] = 
[
    {
        itemId:1,
        itemTitle: "HELP_SERENA_TITLE",
        itemDescription: "HELP_SERENA_DESCRIPTION",
        itemIcon:"location-on",
        //itemOnClick:"LocationAlertsScreen"
    },
    {
        itemId:2,
        itemTitle: "HELP_LOGIN_TITLE",
        itemDescription: "HELP_LOGIN_DESCRIPTION",
        itemIcon:"people",
        //itemOnClick:"EmergencyAlertsScreen"
    },
    {
        itemId:3,
        itemTitle: "HELP_MONITOR_TITLE",
        itemDescription: "HELP_MONITOR_DESCRIPTION",
        itemIcon:"my-location",
        //itemOnClick:"BatteryAlertsScreen"
    },
    {
        itemId:4,
        itemTitle: "HELP_ZONE_TITLE",
        itemDescription: "HELP_ZONE_DESCRIPTION",
        itemIcon:"edit-location",
        //itemOnClick:"MiscAlertsScreen",
    }
    
]

export const ALERTSSCREENMENU:TMenuItem[] = 
[
    {
        itemId:1,
        itemTitle: "ALERTS_LOCATION_TITLE",
        itemDescription: "ALERTS_LOCATION_DESCRIPTION",
        itemIcon:"fmd-bad",
        itemOnClick:"LocationAlertsScreen"
    },
    {
        itemId:2,
        itemTitle: "ALERTS_EMERGENCY_TITLE",
        itemDescription: "ALERTS_EMERGENCY_DESCRIPTION",
        itemIcon:"notification-important",
        itemOnClick:"EmergencyAlertsScreen"
    },
    {
        itemId:3,
        itemTitle: "ALERTS_BATTERY_TITLE",
        itemDescription: "ALERTS_BATTERY_DESCRIPTION",
        itemIcon:"battery-alert",
        itemOnClick:"BatteryAlertsScreen"
        //itemOnClick:"BatteryAlertsScreen"
    },
    // {
    //     itemId:4,
    //     itemTitle: "ALERTS_MISC_TITLE",
    //     itemDescription: "ALERTS_MISC_DESCRIPTION",
    //     itemIcon:"error",
    //     itemOnClick:"MiscAlertsScreen",
    // },
    {
        itemId:5,
        itemTitle: "ALERTS_HISTORY_TITLE",
        itemDescription: "ALERTS_HISTORY_DESCRIPTION",
        itemIcon:"history",
        itemOnClick:"AlertsHistoryScreen",
    },
    {
        itemId:6,
        itemTitle: "ALERTS_CONFIG_TITLE",
        itemDescription: "ALERTS_CONFIG_DESCRIPTION",
        itemIcon:"edit-notifications",
        itemOnClick:"AlertsConfigScreen",
    },
]

export const CONFIGLOGOHEADER:THeaderComponentProps = {
    headerLogo:"settings",
    headerText:"CONFIG_LOGO_HEADER_TEXT"
}
export const DEVICELOGOHEADER:THeaderComponentProps = {
    headerLogo:"watch",
    headerText:"DEVICE_LOGO_HEADER_TEXT"
}
export const ALERTSLOGOHEADER:THeaderComponentProps = {
    headerLogo:"notifications",
    headerText:"ALERTS_LOGO_HEADER_TEXT"
}
export const HELPLOGOHEADER:THeaderComponentProps = {
    headerLogo:"help",
    headerText:"HELP_LOGO_HEADER_TEXT"
}