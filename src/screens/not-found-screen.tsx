/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

/**
 * View to display in the very exceptional edge case that a route is missing.
 * Prevents the app from crashing and provides an error message to the user.
 */
export function NotFoundScreen(): ReactElement {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>This screen doesn&apos;t exist.</Text>
      <TouchableOpacity style={{ marginTop: 15, paddingVertical: 15 }}>
        <Text style={{ fontSize: 14, color: '#2e78b7' }}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}
