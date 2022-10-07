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
const SET_COMPANY_DOSTAVKA = 'SET_COMPANY_DOSTAVKA'

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
  companyKontakti: '',
  companyDostavka: '',

  isAllUrlReady: false
}

export type UrlInitialStateType = typeof initialState

const handleIsAllUrlReady = (state: UrlInitialStateType): boolean => {

  if (state.categoryTea.length > 1
    && state.categoryCoffee.length > 1
    && state.categoryTableware.length > 1
    && state.categoryAccessory.length > 1
    && state.subcatMonosorta.length > 1
    && state.subcatSmesi.length > 1
    && state.subcatCherniy.length > 1
    && state.subcatZeleniy.length > 1
    && state.subcatUlun.length > 1
    && state.subcatBeliy.length > 1
    && state.subcatPuer.length > 1
    && state.subcatTravyanie.length > 1
    && state.subcatKrasniy.length > 1
    && state.companyAbout.length > 1
    && state.companyOptovikam.length > 1
    && state.companyKontakti.length > 1
    && state.companyDostavka.length > 1)
      return true

  return false 
}

const urlReducer = (state = initialState, action: UrlActionTypes): UrlInitialStateType => {

  switch (action.type) {

    case SET_CATEGORY_TEA:
      return {
        ...state,
        categoryTea: action.categoryTea,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_CATEGORY_COFFEE:
      return {
        ...state,
        categoryCoffee: action.categoryCoffee,
        isAllUrlReady: handleIsAllUrlReady(state)
      }
    
    case SET_CATEGORY_TABLEWARE:
      return {
        ...state,
        categoryTableware: action.categoryTableware,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_CATEORY_ACCESSORY:
      return {
        ...state,
        categoryAccessory: action.categoryAccessory,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_MONOSORTA:
      return {
        ...state,
        subcatMonosorta: action.subcatMonosorta,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_SMESI:
      return {
        ...state,
        subcatSmesi: action.subcatSmesi,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_CHERNIY:
      return {
        ...state,
        subcatCherniy: action.subcatCherniy,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_ZELENIY:
      return {
        ...state,
        subcatZeleniy: action.subcatZeleniy,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_ULUN:
      return {
        ...state,
        subcatUlun: action.subcatUlun,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_BELIY:
      return {
        ...state,
        subcatBeliy: action.subcatBeliy,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_PUER:
      return {
        ...state,
        subcatPuer: action.subcatPuer,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_TRAVYANIE:
      return {
        ...state,
        subcatTravyanie: action.subcatTravyanie,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_SUBCAT_KRANIY:
      return {
        ...state,
        subcatKrasniy: action.subcatKrasniy,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_COMPANY_ABOUT:
      return {
        ...state,
        companyAbout: action.companyAbout,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_COMPANY_OPTOVIKAM:
      return {
        ...state,
        companyOptovikam: action.companyOptovikam,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_COMPANY_KONTAKTI:
      return {
        ...state,
        companyKontakti: action.companyKontakti,
        isAllUrlReady: handleIsAllUrlReady(state)
      }

    case SET_COMPANY_DOSTAVKA:
      return {
        ...state,
        companyDostavka: action.companyDostavka,
        isAllUrlReady: handleIsAllUrlReady(state)
      }  

    default: return state  
  }
}

export type UrlActionTypes = SetCategoryTeaType | SetCategoryCoffeeType | SetCategoryTablewareType | 
  SetCategoryAccessoryType | SetSubcatMonosortaType | SetSmesiType | SetSubcatCherniyType | SetSubcatZeleniyType |
  SetSubcatUlunType | SetSubcatBeliyType | SetSubcatPuerType | SetSubcatTravyanieType | SetSubcatKraniyType |
  SetCompanyAboutType | SetCompanyOptovikamType | SetCompanyKontaktiType | SetCompanyDostavkaType

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

type SetCompanyDostavkaType = {
  type: typeof SET_COMPANY_DOSTAVKA
  companyDostavka: string
}
export const setCompantDostavka = (companyDostavka: string): SetCompanyDostavkaType => ({
  type: SET_COMPANY_DOSTAVKA,
  companyDostavka
})

export default urlReducer