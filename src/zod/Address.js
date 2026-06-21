import z from "zod";
export const addressSchema=z.object({
  area:z.string().min(3,{message:"Enter Your Address"}),

  city:z.string().min(3,{message:"Enter Your City"}),

  phone:z.string().min(3,{message:"Enter Your phone No."}).min(10,{message:"charcter must be 10 required"}),

  pincode:z.string().min(3,{message:"Enter Your pincode"}).min(6,{message:"charcter must be 6 required"}),
});