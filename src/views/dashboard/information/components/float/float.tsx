import {Component, TSX, Vue} from "vue-facing-decorator";
import './float.less'
import Cupload from "@/components/commonInput/Cupload";
import {Button, Divider, Input, Switch} from "@arco-design/web-vue";
interface Props {
    propS:string
}
interface Event {
    myEvent:Function
}
@Component({
    name:'float',
    render
})
export default class floatSetting extends TSX<Props,Event>()(Vue){
    templates:string[]=
        ['red','green','blue','yellow','orangered','pink','red','green','blue',
            'orangered','pink','red','green','blue','orangered','pink']
    tem:number|null=null
    form={
        imgArr:'',
        floatLink:'',
        lineSwitch:false,
        lineText:'',
        lineTarget:'',
        lineColor:'#000000',
        faceSwitch:false,
        faceText:'',
        faceTarget:'',
        faceColor:'#000000',
    }
    changeTem(v:number){
        this.tem=v
    }
    Submit(){
        console.log(this.form)
    }
    Reset(){
        Object.assign(this.form,{
            imgArr:'',
            floatLink:'',
            lineSwitch:false,
            lineText:'',
            lineTarget:'',
            lineColor:'#000000',
            faceSwitch:false,
            faceText:'',
            faceTarget:'',
            faceColor:'#000000',
        })
    }
}
function render(this:floatSetting) {
    return <div className='float'>
        <div className='top'>
            <p>模板选择</p>
            <ul>{this.templates.map((it,i)=><li key={it} className={i===this.tem?'act':''} onClick={()=>this.changeTem(i)} style={{backgroundColor:it}}></li>)}</ul>
        </div>
        <Cupload tit="自定图片" url="url"/>
        <p>
            <span>浮窗链接</span>
            <Input v-model={this.form.floatLink} placeholder="Search enter" size="large"/>
        </p>
        <Divider orientation="left">line设置</Divider>
        <p>是否启用&nbsp;&nbsp;<Switch v-model={this.form.lineSwitch}/></p>
        <p>
            <span>文字</span>
            <Input v-model={this.form.lineText} placeholder="Search enter" size="large"/>
        </p>
        <p>
            <span>点击目标地址</span>
            <Input v-model={this.form.lineTarget} placeholder="Search enter" size="large"/>
        </p>
        <p>按钮颜色&nbsp;&nbsp;<input v-model={this.form.lineColor} type='color'/></p>
        <Divider orientation="left">facebook设置</Divider>
        <p>是否启用&nbsp;&nbsp;<Switch v-model={this.form.faceSwitch}/></p>
        <p>
            <span>文字</span>
            <Input v-model={this.form.faceText} placeholder="Search enter" size="large"/>
        </p>
        <p>
            <span>点击目标地址</span>
            <Input v-model={this.form.faceTarget} placeholder="Search enter" size="large"/>
        </p>
        <p>按钮颜色&nbsp;&nbsp;<input v-model={this.form.faceColor} type='color'/></p>
        <div style="margin-top: 20px">
            <Button type="primary" onClick={this.Submit}>Submit</Button>&nbsp;&nbsp;
            <Button onClick={this.Reset}>Reset</Button>
        </div>
    </div>
}