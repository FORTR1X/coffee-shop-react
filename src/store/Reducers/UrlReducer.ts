const SET_CATEGORY_TEA = 'SET_CATEGORY_TEA'
const SET_CATEGORY_COFFEE = 'SET_CATEGORY_COFFEE'
const SET_CATEGORY_TABLEWARE = 'SET_CATEGORY_TABLEWARE'
const SET_CATEORY_ACCESSORY = 'SET_CATEORY_ACCESSORY'

const SET_SUBCAT_MONOSORTA = 'SET_SUBCAT_MONOSORTA'
const SET_SUBCAT_SMESI = 'SET_SUBCAT_SMESI'

const SET_SUBCAT_CHERNIY = 'SET_SUBCAT_CHERNIY'
const SET_SUBCAT_ZELENIY = 'SET_SUBCAT_ZELENIY'
const SET_SUBCAT_ULUN = 'SET_SUBCAT_ULUN'
const SET_SUBCAT_BELIY = 'SET_SUBCAT_BELIY'
const SET_SUBCAT_PUER = 'SET_SUBCAT_PUER'
const SET_SUBCAT_TRAVYANIE = 'SET_SUBCAT_TRAVYANIE'
const SET_SUBCAT_KRANIY = 'SET_SUBCAT_KRANIY'

const SET_COMPANY_ABOUT = 'SET_COMPANY_ABOUT'
const SET_COMPANY_OPTOVIKAM = 'SET_COMPANY_OPTOVIKAM'
const SET_COMPANY_KONTAKTI = 'SET_COMPANY_KONTAKTI'

let initialState = {
  categoryTea: '',
  categoryCoffee: '',
  categoryTableware: '',
  categoryAccessory: '',

  subcatMonosorta: '',
  subcatSmesi: '',

  subcatCherniy: '',
  subcatZeleniy: '',
  subcatUlun: '',
  subcatBeliy: '',
  subcatPuer: '',
  subcatTravyanie: '',
  subcatKrasniy: '',

  companyAbout: '',
  companyOptovikam: '',
  companyKontakti: ''
}

export type UrlInitialStateType = typeof initialState

const urlReducer = (state = initialState, action: UrlActionTypes): UrlInitialStateType => {

  switch (action.type) {

    case SET_CATEGORY_TEA:
      return {
        ...state,
        categoryTea: action.categoryTea
      }

    case SET_CATEGORY_COFFEE:
      return {
        ...state,
        categoryCoffee: action.categoryCoffee
      }
    
    case SET_CATEGORY_TABLEWARE:
      return {
        ...state,
        categoryTableware: action.categoryTableware 
      }

    case SET_CATEORY_ACCESSORY:
      return {
        ...state,
        categoryAccessory: action.categoryAccessory
      }

    case SET_SUBCAT_MONOSORTA:
      return {
        ...state,
        subcatMonosorta: action.subcatMonosorta
      }

    case SET_SUBCAT_SMESI:
      return {
        ...state,
        subcatSmesi: action.subcatSmesi
      }

    case SET_SUBCAT_CHERNIY:
      return {
        ...state,
        subcatCherniy: action.subcatCherniy
      }

    case SET_SUBCAT_ZELENIY:
      return {
        ...state,
        subcatZeleniy: action.subcatZeleniy
      }

    case SET_SUBCAT_ULUN:
      return {
        ...state,
        subcatUlun: action.subcatUlun
      }

    case SET_SUBCAT_BELIY:
      return {
        ...state,
        subcatBeliy: action.subcatBeliy
      }

    case SET_SUBCAT_PUER:
      return {
        ...state,
        subcatPuer: action.subcatPuer
      }

    case SET_SUBCAT_TRAVYANIE:
      return {
        ...state,
        subcatTravyanie: action.subcatTravyanie
      }

    case SET_SUBCAT_KRANIY:
      return {
        ...state,
        subcatKrasniy: action.subcatKrasniy
      }

    case SET_COMPANY_ABOUT:
      return {
        ...state,
        companyAbout: action.companyAbout
      }

    case SET_COMPANY_OPTOVIKAM:
      return {
        ...state,
        companyOptovikam: action.companyOptovikam
      }

    case SET_COMPANY_KONTAKTI:
      return {
        ...state,
        companyKontakti: action.companyKontakti
      }  

    default: return state  
  }
}

export type UrlActionTypes = SetCategoryTeaType | SetCategoryCoffeeType | SetCategoryTablewareType | 
  SetCategoryAccessoryType | SetSubcatMonosortaType | SetSmesiType | SetSubcatCherniyType | SetSubcatZeleniyType |
  SetSubcatUlunType | SetSubcatBeliyType | SetSubcatPuerType | SetSubcatTravyanieType | SetSubcatKraniyType |
  SetCompanyAboutType | SetCompanyOptovikamType | SetCompanyKontaktiType

type SetCategoryTeaType = {
  type: typeof SET_CATEGORY_TEA
  categoryTea: string
}
export const setCategoryTea = (categoryTea: string): SetCategoryTeaType => ({
  type: SET_CATEGORY_TEA,
  categoryTea
}) 

type SetCategoryCoffeeType = {
  type: typeof SET_CATEGORY_COFFEE
  categoryCoffee: string
}
export const setCategoryCoffee = (categoryCoffee: string): SetCategoryCoffeeType => ({
  type: SET_CATEGORY_COFFEE,
  categoryCoffee
})

type SetCategoryTablewareType = {
  type: typeof SET_CATEGORY_TABLEWARE
  categoryTableware: string
}
export const setCategoryTableware = (categoryTableware: string): SetCategoryTablewareType => ({
  type: SET_CATEGORY_TABLEWARE,
  categoryTableware
})

type SetCategoryAccessoryType = {
  type: typeof SET_CATEORY_ACCESSORY
  categoryAccessory: string
}
export const setCategoryAccessory = (categoryAccessory: string): SetCategoryAccessoryType => ({
  type: SET_CATEORY_ACCESSORY,
  categoryAccessory
})

type SetSubcatMonosortaType = {
  type: typeof SET_SUBCAT_MONOSORTA
  subcatMonosorta: string
}
export const setSubcatMonosorta = (subcatMonosorta: string): SetSubcatMonosortaType => ({
  type: SET_SUBCAT_MONOSORTA,
  subcatMonosorta
})

type SetSmesiType = {
  type: typeof SET_SUBCAT_SMESI
  subcatSmesi: string
}
export const setSubcatSmesi = (subcatSmesi: string): SetSmesiType => ({
  type: SET_SUBCAT_SMESI,
  subcatSmesi
})

type SetSubcatCherniyType = {
  type: typeof SET_SUBCAT_CHERNIY
  subcatCherniy: string
}
export const setSubcatCherniy = (subcatCherniy: string): SetSubcatCherniyType => ({
  type: SET_SUBCAT_CHERNIY,
  subcatCherniy
})

type SetSubcatZeleniyType = {
  type: typeof SET_SUBCAT_ZELENIY
  subcatZeleniy: string
}
export const setSubcatZeleniy = (subcatZeleniy: string): SetSubcatZeleniyType => ({
  type: SET_SUBCAT_ZELENIY,
  subcatZeleniy
}) 

type SetSubcatUlunType = {
  type: typeof SET_SUBCAT_ULUN
  subcatUlun: string
}
export const setSubcatUlun = (subcatUlun: string): SetSubcatUlunType => ({
  type: SET_SUBCAT_ULUN,
  subcatUlun
})

type SetSubcatBeliyType = {
  type: typeof SET_SUBCAT_BELIY,
  subcatBeliy: string
}
export const setSubcatBeliy = (subcatBeliy: string): SetSubcatBeliyType => ({
  type: SET_SUBCAT_BELIY,
  subcatBeliy
})

type SetSubcatPuerType = {
  type: typeof SET_SUBCAT_PUER
  subcatPuer: string
}
export const setSubcatPuer = (subcatPuer: string): SetSubcatPuerType => ({
  type: SET_SUBCAT_PUER,
  subcatPuer
})

type SetSubcatTravyanieType = {
  type: typeof SET_SUBCAT_TRAVYANIE
  subcatTravyanie: string
}
export const setSubcatTravyanie = (subcatTravyanie: string): SetSubcatTravyanieType => ({
  type: SET_SUBCAT_TRAVYANIE,
  subcatTravyanie
}) 

type SetSubcatKraniyType = {
  type: typeof SET_SUBCAT_KRANIY
  subcatKrasniy: string
}
export const setSubcatKrasniy = (subcatKrasniy: string): SetSubcatKraniyType => ({
  type: SET_SUBCAT_KRANIY,
  subcatKrasniy
})

type SetCompanyAboutType = {
  type: typeof SET_COMPANY_ABOUT
  companyAbout: string 
}
export const setCompanyAbout = (companyAbout: string): SetCompanyAboutType => ({
  type: SET_COMPANY_ABOUT,
  companyAbout
})

type SetCompanyOptovikamType = {
  type: typeof SET_COMPANY_OPTOVIKAM
  companyOptovikam: string
}
export const setCompanyOptovikam = (companyOptovikam: string): SetCompanyOptovikamType => ({
  type: SET_COMPANY_OPTOVIKAM,
  companyOptovikam
})

type SetCompanyKontaktiType = {
  type: typeof SET_COMPANY_KONTAKTI,
  companyKontakti: string
}
export const setCompanyKontakti = (companyKontakti: string): SetCompanyKontaktiType => ({
  type: SET_COMPANY_KONTAKTI,
  companyKontakti
})

export default urlReducer