export interface ChannelListItem {
    sid: string;
    members?:MemberInfo[];
    friendlyName?: string;
    dateUpdated?: Date;
    lastMessage?:string;
}

export interface MemberInfo{
    identity:string;
    friendlyName?:string;
    online:boolean;
}