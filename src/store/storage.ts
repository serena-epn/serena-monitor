import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware';
import { TUser } from '../types/CustomTypes';

export const storage = new MMKV({
    id:'serena-storage'
});

export const zustandStorage : StateStorage={
    setItem:(name:string,value:string)=>{
        return storage.set(name,value)
    },
    getItem:(name:string)=>{
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem:(name:string)=>{
        return storage.delete(name);
    }
}

// export const userStorage : StateStorage<TUser>={
//     setItem:(user:TUser,value:TUser)=>{
//         return storage.set(user,value)
//     },
//     getItem:(name:TUser)=>{
//         const value = storage.getString(name);
//         return value ?? null;
//     },
//     removeItem:(name:TUser)=>{
//         return storage.delete(name);
//     }
// }
