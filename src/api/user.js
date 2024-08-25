

import request from "@/utils/request.js";

 

export function getUser(pageNum,pageSize,params) {
    return request({
        url: `/employee/page?page=${pageNum}&pageSize=${pageSize}`,
        method: "POST",
        data:params,
    })
}
