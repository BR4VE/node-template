import slug from "slug";

class SlugService {
  constructor(api) {
    this.api = api;
    this.separator = "-";
  }

  slugify(string) {
    return this.api(string);
  }
}

export default new SlugService(slug);
