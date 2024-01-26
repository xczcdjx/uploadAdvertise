import {defineStore} from "pinia";
import {get,  put} from "@/rapi/http";
import {settingInfo, settingupdate} from "@/rapi/url";
import {Vue} from "vue-facing-decorator";

export interface Info {
    computerAdGoalUrl:    string;
    computerAdPictureUrl: string;
    createdAt:            string;
    creator:              string;
    domainName:           string;
    facebookColour:       string;
    facebookGoalUrl:      string;
    facebookStatus:       number;
    facebookText:         string;
    id:                   number;
    lineColour:           string;
    lineGoalUrl:          string;
    lineStatus:           number;
    lineText:             string;
    logoUrl:              string;
    materialMemberId:     number;
    phoneAdGoalUrl:       string;
    phoneAdPictureUrl:    string;
    status:               number;
    template:             string;
    updatedAt:            string;
    updater:              string;
    websiteName:          string;
    windowPictureUrl:     string;
    windowUrl:            string;
}

const useSport = defineStore('sportInfo', {
    persist: true,
    state: () => {
        return {
            info: {
                computerAdGoalUrl: "",
                computerAdPictureUrl: "",
                createdAt: "",
                creator: "",
                domainName: "",
                facebookColour: "",
                facebookGoalUrl: "",
                facebookStatus: 0,
                facebookText: "",
                id: 0,
                lineColour: "",
                lineGoalUrl: "",
                lineStatus: 0,
                lineText: "",
                logoUrl: "",
                materialMemberId: 0,
                phoneAdGoalUrl: "",
                phoneAdPictureUrl: "",
                status: 0,
                template: "",
                updatedAt: "",
                updater: "",
                websiteName: "",
                windowPictureUrl: "",
                windowUrl: ""
            } as Info
        }
    },
    actions: {
        async getSetting() {
            try {
                let r = await get({
                    url: settingInfo,
                })
                this.info = r.resultSet
            } catch (e) {
                console.log(e)
            }
        },
        async setSetting(f: Partial<Info>,cb:()=>void):Promise<string> {
            return await new Promise(async (resolve, reject) => {
               cb()
               await put({
                    url: settingupdate,
                    data: Object.assign(this.info,f)
                }).then(async v=>{
                    await this.getSetting()
                    resolve(v.resDesc)
                }).catch(reject)
            })
        }
    }
})
export default useSport