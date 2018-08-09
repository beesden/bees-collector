/**
 * TypeORM has a dependency of react-native-sqlite-storage.
 * This doesn't break the build but does throw a warning.
 *
 * ```
 * require('react-native-sqlite-storage');
 * ```
 *
 * Rather than install react to hide this, this package has been added to suppress the warning.
 */
