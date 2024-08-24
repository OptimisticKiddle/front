

import request from "@/utils/request.js";

 

export function test(data) {
    return request({
        url: "/test",
        method: "POST",
        data
    })
}
