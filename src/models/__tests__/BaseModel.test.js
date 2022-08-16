import mongoose from "mongoose";

import BaseModel from "models/BaseModel";

const AllPublicFields = { firstName: true, lastName: true, code: true };
const ReturnFields = { firstName: true, lastName: true };
const EntitySchema = mongoose.Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    code: { type: Number, default: null },
  },
  { timestamps: true }
);
const EntityModel = new BaseModel({
  schema: { name: "Entity", target: EntitySchema },
  publicFields: AllPublicFields,
  returnFields: ReturnFields,
});
const TestEntity = { firstName: "Mert", lastName: "Btmz", code: 123 };

describe("BaseModel", () => {
  test("Creates", async () => {
    const entity = await EntityModel.create(TestEntity);

    expect(entity.firstName).toBe(TestEntity.firstName);
    expect(entity.lastName).toBe(TestEntity.lastName);
    expect(entity.code).toBe(TestEntity.code);

    TestEntity._id = entity._id;
  });

  test("Finds one by and returns fields", async () => {
    const entity = await EntityModel.findOneBy({
      firstName: TestEntity.firstName,
    });
    const entityFields = Object.keys(entity.toObject());

    expect(entityFields).toEqual([...Object.keys(ReturnFields), "_id"]);
  });

  test("Finds one by id and returns fields", async () => {
    const entity = await EntityModel.findOneById(TestEntity._id, {
      code: true,
    });
    const entityFields = Object.keys(entity.toObject());

    expect(entity._id).toEqual(TestEntity._id);
    expect(entityFields).toEqual([...Object.keys(AllPublicFields), "_id"]);
  });

  test("Finds one by id and updates", async () => {
    const updateData = { lastName: "B" };

    await EntityModel.findOneByIdAndUpdate(TestEntity._id, updateData);
    const entity = await EntityModel.findOneById(TestEntity._id);
    const entityFields = Object.keys(entity.toObject());

    expect(entity.lastName).toBe(updateData.lastName);

    expect(entityFields).toEqual([...Object.keys(ReturnFields), "_id"]);
  });

  test("Finds many by and returns fields", async () => {
    const entities = await EntityModel.findManyBy(
      { firstName: "Mert" },
      { code: true }
    );

    expect(entities.length).toBeGreaterThan(0);

    entities.forEach((entity) => {
      const entityFields = Object.keys(entity.toObject());
      expect(entityFields).toEqual([...Object.keys(AllPublicFields), "_id"]);
    });
  });

  test("Gets return fields", async () => {
    const returnFields = EntityModel.getReturnFields();
    const allPublicFields = EntityModel.getReturnFields({ code: true });

    expect(returnFields).toEqual(ReturnFields);
    expect(allPublicFields).toEqual(AllPublicFields);
  });

  test("Updates one by id", async () => {
    const updateData = { firstName: "M" };

    await EntityModel.updateOneById(TestEntity._id, updateData);
    const updatedEntity = await EntityModel.findOneById(TestEntity._id);

    expect(updatedEntity.firstName).toBe(updateData.firstName);
  });

  test("Updates one by", async () => {
    const updateData = { firstName: "Mert", lastName: "Btmz" };

    await EntityModel.updateOneBy({ _id: TestEntity._id }, updateData);
    const updatedEntity = await EntityModel.findOneById(TestEntity._id);

    expect(updatedEntity.firstName).toBe(updateData.firstName);
    expect(updatedEntity.lastName).toBe(updateData.lastName);
  });

  test("Deletes one by id", async () => {
    await EntityModel.deleteOneById(TestEntity._id);

    const entity = await EntityModel.findOneById(TestEntity._id);

    expect(entity).toBe(null);
  });

  test("Deletes many by", async () => {
    const entityData = { firstName: "entity", lastName: "entity" };

    await Promise.all([
      EntityModel.create(entityData),
      EntityModel.create(entityData),
    ]);
    await EntityModel.deleteManyBy(entityData);
    const entities = await EntityModel.findManyBy({ entityData });

    expect(entities).toHaveLength(0);
  });
});
