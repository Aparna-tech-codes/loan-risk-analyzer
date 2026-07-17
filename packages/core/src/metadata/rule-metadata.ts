import { RuleMetadata } from "../types/metadata.types";

/**
 * Central registry for rule metadata.
 */
export class RuleMetadataRegistry {
  private readonly registry = new Map<string, RuleMetadata>();

  /**
   * Register metadata.
   */
  register(metadata: RuleMetadata): void {
    if (this.registry.has(metadata.id)) {
      throw new Error(`Rule '${metadata.id}' already registered.`);
    }

    this.registry.set(metadata.id, metadata);
  }

  /**
   * Get metadata.
   */
  get(id: string): RuleMetadata | undefined {
    return this.registry.get(id);
  }

  /**
   * Get all metadata.
   */
  getAll(): RuleMetadata[] {
    return [...this.registry.values()];
  }

  /**
   * Check if exists.
   */
  has(id: string): boolean {
    return this.registry.has(id);
  }

  /**
   * Remove.
   */
  unregister(id: string): void {
    this.registry.delete(id);
  }

  /**
   * Clear.
   */
  clear(): void {
    this.registry.clear();
  }
}
