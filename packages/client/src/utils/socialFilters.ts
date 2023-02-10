import React from 'react'


export const checkListForUserId = (id: string, array: string[]) => {
  let hasUser = false
  if (array == null) return hasUser

  array.forEach((each) => {
    if (each === id) hasUser = true
  })
  return hasUser
}
