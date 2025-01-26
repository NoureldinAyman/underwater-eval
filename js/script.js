document.getElementById('submit-btn').addEventListener('click', async () => {
    // Collect scores
    const scores = {
        enhanced_1: parseInt(document.querySelector('[data-version="1"]').value),
        enhanced_2: parseInt(document.querySelector('[data-version="2"]').value),
        enhanced_3: parseInt(document.querySelector('[data-version="3"]').value)
    };

    // Validate
    if (Object.values(scores).some(score => score < 1 || score > 10)) {
        alert('All scores must be between 1-10!');
        return;
    }

    // Save to Firestore
    try {
        await db.collection('evaluations').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            original_image: document.getElementById('original-img').src,
            scores: scores,
            best_image: Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0]
        });
        
        alert('Saved successfully!');
        // Clear inputs
        document.querySelectorAll('.score-input').forEach(input => input.value = '');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save!');
    }
});
