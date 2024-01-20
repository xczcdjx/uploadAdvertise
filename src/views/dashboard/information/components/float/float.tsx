import {Component, TSX, Vue} from "vue-facing-decorator";
import './float.less'
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

}
function render(this:floatSetting) {
    return <div className='float'>
        123
    </div>
}