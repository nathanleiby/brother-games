import { gamesData } from '../data/gamesData';

// Collect all screenshot filenames from games data
const getAllScreenshots = () => {
  const screenshots = new Set();
  
  gamesData.forEach(game => {
    if (game.screenshots && game.screenshots.length > 0) {
      game.screenshots.forEach(screenshot => {
        screenshots.add(screenshot);
      });
    }
    
    if (game.images?.screenshots && game.images.screenshots.length > 0) {
      game.images.screenshots.forEach(screenshot => {
        screenshots.add(screenshot);
      });
    }
  });
  
  return Array.from(screenshots);
};

// Preload a single image
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload all screenshot images with intelligent batching
export const preloadScreenshots = async () => {
  const screenshots = getAllScreenshots();
  const baseUrl = import.meta.env.BASE_URL;
  
  if (screenshots.length === 0) {
    console.log('No screenshots to preload');
    return [];
  }
  
  console.log(`Preloading ${screenshots.length} screenshots...`);
  
  // Batch preloading to avoid overwhelming the browser
  const batchSize = 3;
  const batches = [];
  
  for (let i = 0; i < screenshots.length; i += batchSize) {
    batches.push(screenshots.slice(i, i + batchSize));
  }
  
  const results = [];
  
  for (const batch of batches) {
    const batchPromises = batch.map(screenshot => {
      const src = `${baseUrl}screenshots/${screenshot}`;
      return preloadImage(src).catch(error => {
        console.warn(`Failed to preload ${screenshot}:`, error);
        return null;
      });
    });
    
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches to be nice to the browser
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const successful = results.filter(result => result.status === 'fulfilled' && result.value !== null).length;
  console.log(`Preloaded ${successful}/${screenshots.length} screenshots successfully`);
  return results;
};

// Preload screenshots for a specific game (useful for lazy loading)
export const preloadGameScreenshots = async (gameId) => {
  const game = gamesData.find(g => g.id === gameId);
  if (!game) return;
  
  const screenshots = game.screenshots || game.images?.screenshots || [];
  if (screenshots.length === 0) return;
  
  const baseUrl = import.meta.env.BASE_URL;
  const preloadPromises = screenshots.map(screenshot => {
    const src = `${baseUrl}screenshots/${screenshot}`;
    return preloadImage(src).catch(error => {
      console.warn(`Failed to preload ${screenshot} for ${gameId}:`, error);
      return null;
    });
  });
  
  return Promise.allSettled(preloadPromises);
};