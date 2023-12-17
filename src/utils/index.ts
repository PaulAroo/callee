const isBrowser = typeof window !== "undefined"

// A class that provides utility functions for working with local storage
export class LocalStorage {
	static get(key: string) {
		if (!isBrowser) return
		const value = localStorage.getItem(key)
		if (value) {
			try {
				return JSON.parse(value)
			} catch (err) {
				return null
			}
		}
		return null
	}

	static set(key: string, value: any) {
		if (!isBrowser) return
		localStorage.setItem(key, JSON.stringify(value))
	}

	static remove(key: string) {
		if (!isBrowser) return
		localStorage.removeItem(key)
	}

	static clear() {
		if (!isBrowser) return
		localStorage.clear()
	}
}
