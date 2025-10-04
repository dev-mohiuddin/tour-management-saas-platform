import express from "express";
import os from "os";
import si from "systeminformation";
import catchAsync from ''

const router = express.Router();

const bytesToMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

// /api/health
router.get(
  "/",
  catchAsync(async (req, res) => {
    // Memory
    const totalMemMB = bytesToMB(os.totalmem());
    const freeMemMB = bytesToMB(os.freemem());
    const usedMemMB = (totalMemMB - freeMemMB).toFixed(2);
    const memUsagePercent = ((usedMemMB / totalMemMB) * 100).toFixed(2);

    // CPU
    const cpuLoad = await si.currentLoad();
    const cpuInfo = await si.cpu();

    // GPU
    let gpuInfo = [];
    try {
      gpuInfo = await si.graphics();
    } catch (err) {
      gpuInfo = { controllers: [] };
    }

    const healthData = {
      status: "UP",
      uptime: process.uptime().toFixed(0) + "s",
      timestamp: new Date().toISOString(),
      memory: {
        totalMB: totalMemMB,
        freeMB: freeMemMB,
        usedMB: usedMemMB,
        usagePercent: memUsagePercent + "%",
      },
      cpu: {
        manufacturer: cpuInfo.manufacturer,
        brand: cpuInfo.brand,
        cores: cpuInfo.cores,
        speedGHz: cpuInfo.speed,
        loadPercent: cpuLoad.currentLoad.toFixed(2) + "%",
      },
      gpu: gpuInfo.controllers.map((gpu) => ({
        model: gpu.model,
        vendor: gpu.vendor,
        vramMB: gpu.vram,
        utilizationPercent: gpu.utilizationGpu
          ? gpu.utilizationGpu + "%"
          : "N/A",
      })),
    };

    res.success({
      data: healthData,
      message: "Health check success",
    });
  })
);

export default router; 
