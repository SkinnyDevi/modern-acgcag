import FileManager from './fileManager';

const CACHE_DIR = '/.acgcag_cache';

export enum CacheType {
  C_EXTRA_TOOLS = 'extra_tools.cache',
}

export type ExtraToolsCache = {
  last_refresh: number; // Timestamp of last refresh
  gb_tool_post_info: string; // Array of GBToolPost files
};

/**
 * Retrieves the path to that `CacheType`.
 * @param type Type of cache to retrieve.
 * @returns Cache path.
 */
function getCachePath(type: CacheType) {
  return `${CACHE_DIR}/${type}`;
}

/**
 * Checks if a certain cache exists.
 * @param type Type of cache to check.
 * @returns True if exists.
 */
function cacheExists(type: CacheType) {
  return FileManager.pathExists(getCachePath(type));
}

/**
 * Saves data to cache.
 * @param type Cache to save to.
 * @param data Data to save.
 */
function saveToCache(type: CacheType, data: ExtraToolsCache) {
  FileManager.saveToFile(JSON.stringify(data), getCachePath(type));
}

/**
 * Deletes a cache.
 * @param type Cache to delete.
 */
function invalidateCache(type: CacheType) {
  FileManager.removeDirOrFile(getCachePath(type));
}

/**
 * Retrieves data from cache.
 * @param type Type of cache to retrieve.
 */
function retriveFromCache(type: CacheType): ExtraToolsCache | null {
  try {
    return JSON.parse(FileManager.readFile(getCachePath(type)));
  } catch {
    return null;
  }
}

const CacheManager = {
  saveToCache,
  invalidateCache,
  cacheExists,
  retriveFromCache,
};

export default CacheManager;
