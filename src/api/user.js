

import request from "@/utils/request.js";

 

export function test(params) {
    return request({
        url: "/employee/page",
        method: "get",
        params
    })
}
