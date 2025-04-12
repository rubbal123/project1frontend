export const API_CONFIG = {
  BASE_URL: "http://localhost:3001/api",
  SIGNIN_URL: "/auth/signin",
  SIGNUP_URL: "/auth/register",
  GET_PROFILE: "/member/getprofile",
  UPDATE_PROFILE: "/member/profile",
  UPDATE_PASSWORD: "/member/updatepassword",
  USER_PRODUCTS: "/member/products",
  ADD_PRODUCTS: "/member/createproduct",
  GET_PRODUCT_BY_ID: "/member/getproduct",
  UPDATE_PRODUCT: "/member/updateproduct",
  GET_INVOICES: "/member/getinvoices",
  CREATE_INVOICES: "/member/createinvoice",
  CREATE_INVOICES_WITH_ITEMS: "/member/createinvoicewithitems",
  GET_PRODUCT_BY_SKU: "/member/getproductbysku",
  GET_DASHBOARD_DATA: "/member/dashboarddata",

  GET_LEAD_TYPE: "/member/getAllLeadType",
  ADD_LEAD_TYPE: "/member/addLeadType",
  UPDATE_LEAD_TYPE: "member/updateLeadType",
  DELETE_LEAD_TYPE: "/member/deleteLeadType",

  GET_LEAD_SOURCE: "/member/getAllLeadSource",
  ADD_LEAD_SOURCE: "/member/addLeadSource",
  UPDATE_LEAD_SOURCE: "member/updateLeadSource",
  DELETE_LEAD_SOURCE: "/member/deleteLeadSource",

  GET_ORGANISATION_PROFILE: "/member/getOrganisationProfile",
  UPDATE_ORGANISATION_PROFILE: "/member/updateOrganisationProfile",
  DELETE_ORGANISATION_PROFILE: "/member/deleteOrganisationProfile",

  ADD_USER_ORGANISATION: "/auth/addUserOrganisation",
  UPDATE_USER_ORGANISATION: "member/updateUserOrganisation",
  GET_USER_ORGANISATION: "/member/getUserOrganisation",
  GET_ALL_USER_ORGANISATION: "/member/getAllUserOrganisation",
  INVITE_USER: "/member/inviteUser",

  ADD_LEAD: "/member/addLead",
  GET_LEAD: "/member/getLeadByUserId",
  GET_ALL_LEAD: "/member/getAllLeadByOrganisationId",
  UPDATE_LEAD: "/member/updateLead",
  DELETE_LEAD: "/member/deleteLead",
};
