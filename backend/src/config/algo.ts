function getFeatures(data: ToddlersData) {
  return [data.gender, data.age, data.weight, data.height, data.lila];
}

function validateFeatures(features: number[]): number[] {
  const FEATURE_LIMITS = [
    { min: 0, max: 1 }, // gender
    { min: 0, max: 60 }, // age (bulan)
    { min: 2, max: 30 }, // weight (kg)
    { min: 30, max: 130 }, // height (cm)
    { min: 5, max: 25 }, // lila (cm)
  ];

  return features.map((val, i) => {
    const limit = FEATURE_LIMITS[i];
    return Math.min(Math.max(val, limit.min), limit.max);
  });
}

function generateSyntheticPoint(p1: number[], p2: number[]): number[] {
  const rand = Math.random();
  const raw = p1.map((val, i) => val + rand * (p2[i] - val));
  return validateFeatures(raw);
}

function euclideanDistance(p1: number[], p2: number[]): number {
  let count = 0;
  for (let i = 0; i < p1.length; i++) {
    const total = (p1[i] - p2[i]) ** 2;
    if (!isNaN(total)) {
      count += total;
    }
  }
  return count;
}

export function smoteToddlers(
  data: ToddlersData[],
  k: number,
  jumlah: number,
  lastId: number
): ToddlersData[] {
  const synthetic: ToddlersData[] = [];

  while (synthetic.length < jumlah) {
    const target = data[Math.floor(Math.random() * data.length)];
    const targetFeatures = getFeatures(target);

    // Hitung tetangga
    const tetangga = data
      .filter((d) => d.id !== target.id)
      .map((d) => ({
        data: d,
        dist: euclideanDistance(getFeatures(d), targetFeatures),
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, k);

    // Pilih tetangga acak
    const neighbor = tetangga[Math.floor(Math.random() * tetangga.length)];
    const syntheticFeatures = generateSyntheticPoint(
      targetFeatures,
      getFeatures(neighbor.data)
    );

    synthetic.push({
      id: lastId + (synthetic.length + 1),
      name: `Synthetic ${synthetic.length + 1}`,
      gender: target.gender,
      age: syntheticFeatures[0],
      weight: syntheticFeatures[1],
      height: syntheticFeatures[2],
      lila: syntheticFeatures[3],
      status: target.status,
    });
  }

  return synthetic;
}

// Fungsi KNN
export function knnToddlers(data: ToddlersData[], payload: CreateDataPayload) {
  const gender = payload.gender === "L" ? 1 : 0;
  const feature = [
    gender,
    payload.age,
    parseFloat(payload.weight),
    parseFloat(payload.height),
    parseFloat(payload.lila),
  ];

  const neighbor = data
    .map((d) => ({
      ...d,
      gender: d.gender === 1 ? "L" : "P",
      dist: euclideanDistance(getFeatures(d), feature),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, payload.k);

  const n0 = neighbor.filter((item) => item.status === "0");
  const n1 = neighbor.filter((item) => item.status === "1");

  let decision = "";
  if (n0.length > n1.length) {
    decision = "0";
  }
  if (n1.length > n0.length) {
    decision = "1";
  }

  return {
    payload: { ...payload, status: decision },
    neighbor,
  };
}

export function dataNormalization(data: number, min: number, max: number) {
  return (data - min) / (max - min);
}

export function minimumFilter(data: ToddlersData[]) {
  const age = (data as ToddlersData[])
    .map((item) => item.age)
    .sort((a, b) => a - b)
    .slice(0, 1)[0];

  const weight = (data as ToddlersData[])
    .map((item) => item.weight)
    .sort((a, b) => a - b)
    .slice(0, 1)[0];

  const height = (data as ToddlersData[])
    .map((item) => item.height)
    .sort((a, b) => a - b)
    .slice(0, 1)[0];

  const lila = (data as ToddlersData[])
    .map((item) => item.lila)
    .sort((a, b) => a - b)
    .slice(0, 1)[0];

  return {
    age,
    weight,
    height,
    lila,
  };
}

export function maximumFilter(data: ToddlersData[]) {
  const age = (data as ToddlersData[])
    .map((item) => item.age)
    .sort((a, b) => b - a)
    .slice(0, 1)[0];

  const weight = (data as ToddlersData[])
    .map((item) => item.weight)
    .sort((a, b) => b - a)
    .slice(0, 1)[0];

  const height = (data as ToddlersData[])
    .map((item) => item.height)
    .sort((a, b) => b - a)
    .slice(0, 1)[0];

  const lila = (data as ToddlersData[])
    .map((item) => item.lila)
    .sort((a, b) => b - a)
    .slice(0, 1)[0];

  return {
    age,
    weight,
    height,
    lila,
  };
}
