import avro from "avsc";

export default avro.Type.forSchema({
  type: "record",
  fields: [
    {
      name: "cpu",
      type: "double",
    },
    {
      name: "memory",
      type: "double",
    },
    {
      name: "uptime",
      type: "double",
    },
  ],
});
