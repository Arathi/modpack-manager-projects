export const formatCategory = (name: string) => {
  if (name === "modloader") {
    return "Risugami's ModLoader";
  } else if (name === "bungeecord") {
    return "BungeeCord";
  } else if (name === "liteloader") {
    return "LiteLoader";
  } else if (name === "neoforge") {
    return "NeoForge";
  } else if (name === "game-mechanics") {
    return "Game Mechanics";
  } else if (name === "worldgen") {
    return "World Generation";
  } else if (name === "core-shaders") {
    return "Core Shaders";
  } else if (name === "gui") {
    return "GUI";
  } else if (name === "8x-") {
    return "8x or lower";
  } else if (name === "512x+") {
    return "512x or higher";
  } else if (name === "kitchen-sink") {
    return "Kitchen Sink";
  } else if (name === "path-tracing") {
    return "Path Tracing";
  } else if (name === "pbr") {
    return "PBR";
  } else if (name === "datapack") {
    return "Data Pack";
  } else if (name === "colored-lighting") {
    return "Colored Lighting";
  } else if (name === "optifine") {
    return "OptiFine";
  } else if (name === "bta-babric") {
    return "BTA (Babric)";
  } else if (name === "legacy-fabric") {
    return "Legacy Fabric";
  } else if (name === "java-agent") {
    return "Java Agent";
  } else if (name === "nilloader") {
    return "NilLoader";
  } else if (name === "mrpack") {
    return "Modpack";
  } else if (name === "minecraft") {
    return "Resource Pack";
  } else if (name === "vanilla") {
    return "Vanilla Shader";
  } else if (name === "geyser") {
    return "Geyser Extension";
  }
  return capitalizeString(name);
};

export const capitalizeString = (name: string) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : name;
};
