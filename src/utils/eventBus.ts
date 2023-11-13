/*
 * vue3事件总线
 * */
import mitt from 'mitt'
const EventBus = mitt<{}>()
export default EventBus
