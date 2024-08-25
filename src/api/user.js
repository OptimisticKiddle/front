

import request from "@/utils/request.js";

 

export const getUser = (pageNum,pageSize,params)=> {
    return request({
        url: `/employee/page?page=${pageNum}&pageSize=${pageSize}`,
        method: "POST",
        data:params,
    })
}

export const addUser = (user) => {
	return request({
		url: `/employee/save`,
		method: "POST",
		data:user,
	})
}

export const deleteUsers = (ids)=>{
	return request({
		url: `/employee?ids=${ids}`,
		method: "delete",
})
}




