import slug from "slug";

class SlugManager {
  constructor(api) {
    this.api = api;
    this.separator = "-";
  }

  slugify(string) {
    return this.api(string);
  }
}

export default new SlugManager(slug);
