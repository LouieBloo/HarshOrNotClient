export interface ChannelListItem {
    sid: string;
    memberInfo?:MemberInfo[];
    friendlyName?: string;
    dateUpdated?: Date;
    lastMessage?:{
        index:number;
        timestamp:Date;
    };
}

export interface MemberInfo{
    identity:string;
    friendlyName?:string;
    online:boolean;
}