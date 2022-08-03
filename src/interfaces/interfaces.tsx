import React from "react"

export interface Category {
    id: number,
    title: string,
    url: string
}

export interface Subcategory {
    id: number,
    title: string,
    url: string
}

export interface Product {
    id: number,
    header: string,
    price: number,
    description: string
}