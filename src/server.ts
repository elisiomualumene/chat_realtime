import { serverHttp } from "./http";
import "./socket"

serverHttp.listen(4000, () => {
    console.log('server is running on port 4000')
})