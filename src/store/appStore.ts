import {create} from 'zustand'
import { TAlertsConfig, TLocation, TMapConfig, TUser } from '../types/CustomTypes'
import {createJSONStorage, persist} from 'zustand/middleware'
import { zustandStorage } from './storage';

export interface AppState{
    appUser:TUser,
    applicationToken:string,
    mapConfig:TMapConfig,
    alertsConfig:TAlertsConfig,
    lastLocation:TLocation,
    setUser:(userInput:TUser)=>void;
    loginUser:(recoveredUser:TUser)=>void;
    logoutUser:()=>void;
    setIsDarkMap:(isDark:boolean)=>void;
    setAlertsConfig:(alertsConfig:TAlertsConfig)=>void;
    setApplicationToken:(token:string)=>void;
    setLastLocation:(location:TLocation)=>void;
    //setDeviceConfig:(deviceConfig:TDeviceConfig)=>void;
}

// const useAppStoreHook = create<AppState>((set)=>({
//     appUser: {
//         name: "string",
//         lastname:"string",
//         birthdate:"string",
//         phone:"string",
//         email: "string",
//         idNumber:"string",
//         assignedPatient:{
//           name: "string",
//           lastname:"string",
//           birthdate:"string",
//           contactInfo:"string",
//           idNumber:"string",
//         },
//         accessToken: "out",
//       },
//       loginUser:(userLogin:TUser)=>set((state)=>{
        
//         return {
//           appUser:userLogin
//         }
//       })
    
    

// }))

const useAppStoreHook = create<AppState>()(
  persist(
    (set,get)=>({
      appUser: {} as TUser,
      applicationToken:'',
      mapConfig:{
        isDark:false
      },
      alertsConfig:
      {
        locationEnabled:true,
        emergenciesEnabled:true,
        batteryEnabled:true,
        miscEnabled:true
      },
      deviceConfig:{
        locationTime:0,
        batteryPercentage:15,
        batteryTime:10
      },
      lastLocation:{latitude:0,longitude:0,registeredAt:new Date()} as TLocation,
      setUser: async(userInput:TUser)=>
      set(()=>{
        return {
          appUser:userInput
        }
      }),
      loginUser:(recoveredUser:TUser)=>
      set(()=>{
        return {
          appUser:recoveredUser
        }
      }),
      logoutUser:()=>
      set(()=>{
        return {
          appUser:{} as TUser
        }
      }),
      setIsDarkMap:(isDark:boolean)=>
      set(()=>{
        return {
          mapConfig:{
            isDark:isDark
          }
        }
      }),
      setAlertsConfig:(alertsConfig:TAlertsConfig)=>
      set(()=>{
        return {
          alertsConfig:alertsConfig
        }
      }),
      
      setApplicationToken:(token:string)=>
        set(()=>{
          return{
            applicationToken:token
          }
        }),
        setLastLocation:(location:TLocation)=>
          set(()=>{
            return{
              lastLocation:location
            }
          }),
    })
    ,
    {
      name:'user-storage',
      storage: createJSONStorage(()=>zustandStorage),
    }
  )
)

  
export default useAppStoreHook;