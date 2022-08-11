import React from "react"

export type CategoryType = {
    id: number,
    title: string,
    url: string
}

export type SubcategoryType = {
    id: number,
    title: string,
    url: string
}

export type CompanyCategoryType = {
    id: number,
    title: string,
    url: string
}

export type ProductType = {
    id: number,
    header: string,
    price: number,
    description: string
}

export type SpoilerContentType = {
    title: string | undefined | null,
    content: SubcategoryType[] | undefined | null,
    categoryUrl: string | undefined
}

export type UserType = {
    email: string
    phoneNumber: string
}