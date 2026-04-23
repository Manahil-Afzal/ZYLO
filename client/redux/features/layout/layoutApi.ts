import {apiSlice} from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type) => ({
                url: `layout/get-layout/${type}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
         editLayout: builder.mutation({
            query: ({type, image, title, subTitle, subtitle, tagline, tagLine, faq, categories}) => ({
                url: `layout/edit-layout`,
                body:{
                    type,
                    image,
                    title,
                    subtitle: subtitle ?? subTitle,
                    tagline: tagline ?? tagLine,
                    faq,
                    categories,
                },
                method: "PUT",
                credentials: "include" as const,
            })
        }),
     })
});

export const {useGetHeroDataQuery, useEditLayoutMutation} = layoutApi;