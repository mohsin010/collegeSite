import { createBrowserHistory } from 'history';

export default createBrowserHistory({
    moveBack:function(){
        window.history.back();
    }
});