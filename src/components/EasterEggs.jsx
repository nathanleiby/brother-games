import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EasterEggs = ({ gameId, onEasterEggFound }) => {
  const [foundEggs, setFoundEggs] = useState(new Set());
  const [showModal, setShowModal] = useState(null);

  const easterEggs = {
    'borderlands-original': {
      text: '🔫',
      story: {
        title: 'The Great Weapon Mishap of 2012',
        content: `It was a legendary orange weapon. The kind you'd spend hours farming for. And there I was, trying to show it off to my brother in our Borderlands co-op session.

"Check this out!" I said, dropping the weapon so he could see the stats.

What I didn't realize was that we were standing near the edge of the world. The weapon dropped... and kept dropping... into the abyss below.

We both watched in horror as hundreds of hours of grinding disappeared into the void. There was a moment of complete silence on voice chat.

Then we both started laughing uncontrollably. It became the stuff of legend - referenced in every subsequent co-op game we played. "Remember that time you threw the legendary weapon off the world?"

Some mistakes become the best memories.`
      }
    },
    'factorio': {
      text: '🏭',
      story: {
        title: 'The Wiki Addiction Begins',
        content: `"Just let me check the wiki real quick..."

Famous last words in our Factorio sessions. What started as a quick lookup of optimal ratios turned into hour-long deep dives into efficiency calculations.

"Wait, did you know that if we adjust the belt speed and use this inserter configuration..."

"Hold on, the wiki says we can increase throughput by 23% if we..."

We'd spend more time reading about optimal factory designs than actually building them. But somehow, that became part of the fun. The shared obsession with perfection, the late-night discussions about belt ratios, the excitement of discovering a new technique.

Wiki reading became a co-op activity in itself.`
      }
    },
    'generation-zero': {
      text: '📸',
      story: {
        title: 'Photo Shoots & Bicycle Physics',
        content: `Who knew that a robot-hunting game would turn into a photography exhibition?

"Wait, stop! That explosion looks amazing behind that building!"

*Screenshot*

"Okay, now let me ride the bicycle into that robot..."

*Screenshot*

Generation Zero became less about surviving Swedish robots and more about capturing the perfect action shot. We'd spend entire sessions staging elaborate photo compositions, experimenting with the surprisingly good bicycle physics, and laughing at the absurd situations we'd create.

The Swedish countryside became our photography studio, complete with giant robot props and questionable bicycle stunts.`
      }
    },
    'terraria': {
      text: '📚',
      story: {
        title: 'Wiki Warriors United',
        content: `"The wiki says we need to dig down to find..."

"Already looked it up, we need these specific items..."

"Wait, check this page about optimal building techniques..."

Terraria turned us into professional wiki researchers. We'd have multiple browser tabs open, comparing building strategies, looking up crafting recipes, and diving deep into boss mechanics.

The game became a collaborative research project. One of us would be digging, the other would be wiki-diving, sharing discoveries in real-time.

"Did you know you can do THIS with platforms?"

Hours would pass in this perfect loop of building, researching, and sharing knowledge. The wiki became our co-op partner.`
      }
    }
  };

  const handleEasterEggClick = (eggId) => {
    if (!foundEggs.has(eggId)) {
      setFoundEggs(prev => new Set([...prev, eggId]));
      onEasterEggFound?.(eggId);
    }
    setShowModal(eggId);
  };

  const currentEgg = easterEggs[gameId];
  if (!currentEgg) return null;

  return (
    <>
      <motion.div
        className="easter-egg"
        onClick={() => handleEasterEggClick(gameId)}
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: foundEggs.has(gameId) ? 1 : 0.7,
          textShadow: foundEggs.has(gameId) ? '0 0 10px #64ffda' : 'none'
        }}
      >
        {currentEgg.text}
      </motion.div>

      <AnimatePresence>
        {showModal === gameId && (
          <motion.div
            className="easter-egg-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(null)}
          >
            <motion.div
              className="easter-egg-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{currentEgg.story.title}</h3>
                <button onClick={() => setShowModal(null)}>×</button>
              </div>
              <div className="modal-content">
                <p>{currentEgg.story.content}</p>
              </div>
              <div className="modal-footer">
                <p>🥚 Easter egg found! There are more hidden throughout the site...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;